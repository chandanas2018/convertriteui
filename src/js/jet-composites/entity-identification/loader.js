/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./entity-identification-view.html', './entity-identification-viewModel', 'text!./component.json', 'css!./entity-identification-styles'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('entity-identification', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);