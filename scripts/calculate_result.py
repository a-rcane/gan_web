import os

import click
# import lpips.lpips
from PIL import Image, ImageEnhance
from skimage import io, metrics, img_as_ubyte
from skimage.transform import resize


def get_image_size(image_path):
    with Image.open(image_path) as img:
        return img.size


def resize_image(input_path, output_path, size=(256, 256)):
    if not os.path.exists(output_path):
        os.makedirs(output_path)

    with Image.open(input_path) as img:
        img_resized = img.resize(size, Image.ANTIALIAS)  # ANTIALIAS is a high-quality downsampling filter
        img_resized.save(output_path)


#
#
# def calculate_lpips(input_dir, output_dir):
#     loss_fn_alex = lpips.LPIPS(net='alex')  # best forward scores
#     loss_fn_vgg = lpips.LPIPS(net='vgg')  # more traditional perceptual similarity
#     avg_dist_alex, avg_dist_vgg, count = 0, 0, 0
#     for img1, img2 in zip(os.listdir(input_dir), os.listdir(output_dir)):
#         dist_alex = loss_fn_alex(img1, img2)
#         dist_vgg = loss_fn_vgg(img1, img2)
#         print("dist_vgg: ", dist_vgg)
#         print("dist_alex: ", dist_alex)
#         avg_dist_vgg += dist_vgg
#         avg_dist_alex += dist_alex
#         count += 1
#
#     avg_dist_vgg /= count
#     avg_dist_alex /= count
#     print("perceptual_similarity (vgg): ", avg_dist_vgg)
#     print("perceptual_similarity (alex): ", avg_dist_alex)
#
#     return avg_dist_vgg, avg_dist_alex

def sharpen_image(img):
    print("img: ", img)
    im = Image.open(img)
    ImageEnhance.Sharpness(im).enhance(1.0)


def calculate_ssim_and_psnr(input_dir, output_dir):
    current_dir = os.path.join(os.getcwd(), "results")
    avg_psnr, avg_ssim, count = 0, 0, 0
    # calculate_lpips(input_dir, output_dir)
    for img1, img2 in zip(os.listdir(input_dir), os.listdir(output_dir)):
        file_path1 = os.path.join(current_dir, "ip2", img1)
        file_path2 = os.path.join(current_dir, "op2", img2)

        image1 = io.imread(file_path1)

        image_resized = resize(image1, (256, 256), anti_aliasing=True)
        image_resized = img_as_ubyte(image_resized)
        io.imsave(file_path1, image_resized)

        # sharpen_image(file_path2)

        image2 = io.imread(file_path2)
        image1 = io.imread(file_path1)

        min_side = min(image1.shape[:2] + image2.shape[:2])
        max_win_size = min_side if min_side % 2 != 0 else min_side - 1

        ssim_index = metrics.structural_similarity(image1, image2, win_size=min(max_win_size, 7), channel_axis=2)
        psnr_value = metrics.peak_signal_noise_ratio(image1, image2)

        print("ssim_value: ", ssim_index)
        print("psnr_value: ", psnr_value)

        avg_psnr += psnr_value
        avg_ssim += ssim_index
        count += 1

    avg_ssim /= count
    avg_psnr /= count

    print("avg_ssim_value: ", avg_ssim)
    print("avg_psnr_value: ", avg_psnr)

    return avg_ssim, avg_psnr


@click.command()
@click.option('--input_dir', help='input directory path')
@click.option('--output_dir', help='output directory path')
def calculate_command(input_dir, output_dir):
    return calculate_ssim_and_psnr(input_dir, output_dir)


if __name__ == '__main__':
    calculate_command()
