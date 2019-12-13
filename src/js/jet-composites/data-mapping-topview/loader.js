/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./data-mapping-topview-view.html', './data-mapping-topview-viewModel', 'text!./component.json', 'css!./data-mapping-topview-styles'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('data-mapping-topview', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);