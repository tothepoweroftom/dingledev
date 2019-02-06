import * as THREE from 'three'
import OBJLoader from 'three-obj-loader-es6-module';

class ModelLoader {

  static instance;

  //Files to load

  constructor() {
    this.files = [
      'static/models/dingle_detail.obj',
    ];

    this.modelNames = [
      'dingle',
    ]
    this.index = 0;
    this.models = [];

    this.instance = this;
  }


  // Load all models, resolve when finished.



  //Recursive function 
  loadFiles() {
    let loader = new OBJLoader();

    let promise = new Promise((resolve, reject) => {
      let counter = 0;
      for (let i = 0; i < this.files.length; i++) {

        // Load a glTF resource
        loader.load(
          // resource URL
          this.files[i],
          // called when the resource is loaded
          (obj) => {

            let model = {};
            model.name = this.modelNames[i];
            model.obj = obj;
            this.models.push(model);
            //console.log(model);
            counter += 1;
            // We've reached the final file.
            if (counter === this.files.length) {
              resolve();
            }



          },
          // called while loading is progressing
          function (xhr) {

            //console.log((xhr.loaded / xhr.total * 100) + '% loaded');

          },
          // called when loading has errors
          function (error) {

            console.log('An error happened');
            console.log(error);
            reject();

          }
        );
      }
    })
    return promise;
  }




}

export default new ModelLoader();
