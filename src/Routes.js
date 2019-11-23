import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  MarkdownViewer as MarkdownViewerView,
  MarkdownList as MarkdownListView,
  DevelopList as DevelopListView,
  NotFound as NotFoundView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/develop"
      />
      <RouteWithLayout
        component={MarkdownViewerView}
        exact
        layout={MainLayout}
        path="/markdown"
      />
      <RouteWithLayout
        component={MarkdownListView}
        exact
        layout={MainLayout}
        path="/markdownlist"
      />
      <RouteWithLayout
        component={DevelopListView}
        exact
        layout={MainLayout}
        path="/develop"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
