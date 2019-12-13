/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./project-list-view.html', './project-list-viewModel', 'text!./component.json', 'css!./project-list-styles'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('project-list', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);