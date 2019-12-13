/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./entity-mapping-view.html', './entity-mapping-viewModel', 'text!./component.json', 'css!./entity-mapping-styles'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('entity-mapping', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);