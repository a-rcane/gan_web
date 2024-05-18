import keras.backend as K
from keras.applications import EfficientNetB0
from keras.applications.vgg19 import VGG19
from keras.models import Model
import numpy as np

# Note the image_shape must be multiple of patch_shape
image_shape = (256, 256, 3)

# vgg = VGG19(include_top=False, weights='imagenet', input_shape=image_shape)
# loss_model = Model(inputs=vgg.input, outputs=vgg.get_layer('block3_conv3').output)
# loss_model.trainable = False

efficient_net = EfficientNetB0(include_top=False, weights='imagenet', input_shape=image_shape)
loss_model = Model(inputs=efficient_net.input, outputs=efficient_net.get_layer('block3a_expand_activation').output)


def l1_loss(y_true, y_pred):
    return K.mean(K.abs(y_pred - y_true))


def perceptual_loss_100(y_true, y_pred):
    return 100 * perceptual_loss(y_true, y_pred)


def perceptual_loss(y_true, y_pred):
    return K.mean(K.square(loss_model(y_true) - loss_model(y_pred)))


def wasserstein_loss(y_true, y_pred):
    return K.mean(y_true*y_pred)


def gradient_penalty_loss(self, y_true, y_pred, averaged_samples):
    gradients = K.gradients(y_pred, averaged_samples)[0]
    gradients_sqr = K.square(gradients)
    gradients_sqr_sum = K.sum(gradients_sqr,
                              axis=np.arange(1, len(gradients_sqr.shape)))

    gradient_l2_norm = K.sqrt(gradients_sqr_sum)
    gradient_penalty = K.square(1 - gradient_l2_norm)

    return K.mean(gradient_penalty)
