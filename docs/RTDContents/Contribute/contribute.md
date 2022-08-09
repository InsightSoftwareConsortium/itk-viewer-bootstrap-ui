# Develop

## Requirements

 - Install Node 14+
 - Install NPM 6+
 - Install Eslint 8.17+

supported browsers:
 - Chrome


## Clone source code

Git clone using HTTPS:
```sh
$ https://github.com/InsightSoftwareConsortium/itk-viewer-bootstrap-ui.git
```
or using SSH:
```sh
$ git clone git@github.com:InsightSoftwareConsortium/itk-viewer-bootstrap-ui.git
```

## Run the app
From the top folder `itk-viewer-bootstrap-ui`, run

```sh
$ npm run dev
```

## Basic datasets for functionality tests

To test the behavior of the UI, you can choose different input files in the `index.html` such as:

 -  For 2D image with different components (color channels):
```
 const ipfsImage = new URL("http://localhost:8082/test-data/astronaut.zarr")
```
and set 
```
itkVtkViewer.createViewer(container,
{
	image: ipfsImage,
	rotate: false,
	config: { uiMachineOptions },
	use2D: true
})
```

 - For 3D dataset with labels:
```
 const ipfsImage = new URL("http://localhost:8082/test-data/HeadMRVolume.nrrd")
 const label = new URL("http://localhost:8082/test-data/HeadMRVolumeLabels.nrrd")
```
and set 

```
itkVtkViewer.createViewer(container,
{
	image: ipfsImage,
	labelImage:label,
	rotate: false,
	config: { uiMachineOptions },
})
```


# Document


## Requirements
 - Sphinx
 - MyST
 - Python and Docutils 0.17+
 - Jupyterlite
 - Sphinx-Jupyterlite

For latest version and versioning check the [requirements](https://github.com/InsightSoftwareConsortium/itk-viewer-bootstrap-ui/blob/main/docs/requirements.txt). 

We suggest you first create a dedicated environment, so what you do is reproducible

```
$ mamba create -n name-of-environment
```
and activate it
```
$ mamba activate name-of-environment
```
then you can install the dependencies by doing 
```
$ cd docs/
$ pip install -r requirements.txt
```

Once you make modifications to the documentation you can rebuild it by:
```
$ sh script_build.sh
```
For local visualization of the ReadTheDocs documentation site:
```
$ google-chrome build/html/index.html
```

For local visualization of your JupyterLite builds, you can run it manually by:
```
$ cd jupyterlite
$ jupyter lite serve --config ./jupyterlite_config.json
```
To test the behavior of your app, please make sure to visit the [local server](http://127.0.0.1:8000/index.html
). Clicking on the JupyterLite badge will probably not work locally even if you are serving it as above. 



## Pull Request Preview

With the built-in Read-the-docs PR Preview functionality, you can check if the behavior you have is expected. 




## Resources 
 - [Sphinx](https://www.sphinx-doc.org/en/master/index.html)
 - [MyST](https://myst-parser.readthedocs.io/en/latest/index.html)
 - [Read the docs](https://readthedocs.org/)
 - [Sphinx and Markdown course](https://training.talkpython.fm/courses/static-sites-with-sphinx-and-markdown)
