/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./data-mapping-subview-view.html', './data-mapping-subview-viewModel', 'text!./component.json', 'css!./data-mapping-subview-styles'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('data-mapping-subview', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);