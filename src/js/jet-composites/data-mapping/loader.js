/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./data-mapping-view.html', './data-mapping-viewModel', 'text!./component.json', 'css!./data-mapping-styles'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('data-mapping', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);