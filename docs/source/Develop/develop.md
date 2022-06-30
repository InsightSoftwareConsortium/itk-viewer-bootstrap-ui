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
