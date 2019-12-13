/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./entity-identification-subview-view.html', './entity-identification-subview-viewModel', 'text!./component.json', 'css!./entity-identification-subview-styles'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('entity-identification-subview', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);