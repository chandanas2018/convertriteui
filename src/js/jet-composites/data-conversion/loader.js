/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./data-conversion-view.html', './data-conversion-viewModel', 'text!./component.json', 'css!./data-conversion-styles'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('data-conversion', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);