/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./upload-extracts-view.html', './upload-extracts-viewModel', 'text!./component.json', 'css!./upload-extracts-styles'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('upload-extracts', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);