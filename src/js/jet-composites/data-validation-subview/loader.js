/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./data-validation-subview-view.html', './data-validation-subview-viewModel', 'text!./component.json', 'css!./data-validation-subview-styles'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('data-validation-subview', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);