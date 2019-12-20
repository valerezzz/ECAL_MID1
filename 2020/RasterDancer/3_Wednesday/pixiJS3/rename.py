from os import listdir
from os.path import isfile, join
import os
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('--folder', help='parent folder for renaming content')
args = parser.parse_args()


images_folder = args.folder
i=0
for f in sorted(listdir(images_folder)):
    if isfile(join('./'+images_folder+'/', f)) and f != '.DS_Store':
        # number = int(f[:-4])
        print(f)
        number = i
        if number<10:
            os.rename(join('./'+images_folder+'/', f),join('./'+images_folder+'/', '0'+str(i)+'.png'))
        else:
            os.rename(join('./'+images_folder+'/', f),join('./'+images_folder+'/', str(i)+'.png'))
        # elif number<100:
        #     os.rename(join('./'+images_folder+'/', f),join('./'+images_folder+'/', '00'+str(i))+'.jpg')
        # elif number<1000:
        #     os.rename(join('./'+images_folder+'/', f),join('./'+images_folder+'/', '0'+str(i))+'.jpg')
    i+=1
