/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./data-conversion-subview-view.html', './data-conversion-subview-viewModel', 'text!./component.json', 'css!./data-conversion-subview-styles'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('data-conversion-subview', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);