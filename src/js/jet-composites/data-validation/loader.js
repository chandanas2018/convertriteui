/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./data-validation-view.html', './data-validation-viewModel', 'text!./component.json', 'css!./data-validation-styles'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('data-validation', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);