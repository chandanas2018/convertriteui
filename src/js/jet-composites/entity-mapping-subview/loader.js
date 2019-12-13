/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./entity-mapping-subview-view.html', './entity-mapping-subview-viewModel', 'text!./component.json', 'css!./entity-mapping-subview-styles'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('entity-mapping-subview', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);