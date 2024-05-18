import numpy as np
from PIL import Image
import click
import os

from deblurgan.model import generator_model
from deblurgan.utils import load_image, deprocess_image, preprocess_image


def deblur(weight_path, input_dir, output_dir):
    g = generator_model()
    g.load_weights(weight_path)

    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for image_name in os.listdir(input_dir):
        full_image_path = os.path.join(input_dir, image_name)
        image = np.array([preprocess_image(load_image(full_image_path))])
        generated_images = g.predict(x=image)

        generated = np.array([deprocess_image(img) for img in generated_images])[0]
        im = Image.fromarray(generated.astype(np.uint8))
        im.save(os.path.join(output_dir, image_name))


@click.command()
@click.option('--weight_path', help='Model weight')
@click.option('--input_dir', help='Image to deblur directory')
@click.option('--output_dir', help='Deblurred image directory')
def deblur_command(weight_path, input_dir, output_dir):
    return deblur(weight_path, input_dir, output_dir)


if __name__ == "__main__":
    deblur_command()
