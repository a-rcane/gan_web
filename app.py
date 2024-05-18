import io
import cv2
import numpy as np
import os
import tkinter as tk
from tkinter import Toplevel
from flask import Flask, request, send_file, jsonify, render_template_string
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
from PIL import Image, ImageTk
import os
import subprocess
import os, shutil

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

input_dir = 'C:\\Users\\sanch\\Documents\\GitHub\\GAN\\results\\ip3\\'
output_dir = 'C:\\Users\\sanch\\Documents\\GitHub\\GAN\\results\\output\\'


def clear_contents(path):
    folder = path
    for filename in os.listdir(folder):
        file_path = os.path.join(folder, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print('Failed to delete %s. Reason: %s' % (file_path, e))


def open_image_popup(image_path):
    popup = Toplevel()
    popup.title("Image Viewer")
    
    img = Image.open(image_path)
    img = img.resize((256, 256), Image.ANTIALIAS)  # Resize image to fit popup window
    img = ImageTk.PhotoImage(img)

    img_label = tk.Label(popup, image=img)
    img_label.image = img  # Keep a reference to avoid garbage collection
    img_label.pack()


def create_main_window(image_path):
    root = tk.Tk()
    root.title("Image Gallery")

    if os.path.isfile(image_path):
        btn = tk.Button(root, text=image_path, command=lambda p=image_path: open_image_popup(p))
        btn.pack()

    root.mainloop()


@app.route('/', methods=['POST'])
def deblur():
    file = request.files['file']
    image = Image.open(file)
    clear_contents(input_dir)
    print("Folder cleared")
    filename = os.path.splitext(file.filename)[0] + '.jpg'
    print("filename: ", filename)
    filepath = os.path.join('C:\\Users\\sanch\\Documents\\GitHub\\GAN\\results\\ip3', filename)
    print("filepath: ", filepath)
    image.save(filepath)
    print("Saved in folder")
    script_path = 'C:/Users/sanch/Documents/GitHub/GAN/scripts/deblur_image.py'
    weight_path = 'C:/Users/sanch/Documents/GitHub/GAN/generator.h5'
    command = [
        'python', script_path,
        '--weight_path', weight_path,
        '--input_dir', input_dir,
        '--output_dir', output_dir
    ]
    print("command set")
    result = subprocess.run(command, capture_output=True, text=True)
    image_disp = os.path.join('C:\\Users\\sanch\\Documents\\GitHub\\GAN\\results\\output', filename)
    create_main_window(image_disp)

    return jsonify("deblurred")


if __name__ == '__main__':
    app.run(debug=True)
