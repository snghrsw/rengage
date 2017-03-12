export default class UniversalRouteRedirectException extends Error {

  public pathTransitionTo: string;

  constructor(pathTransitionTo: string) {
    super();
    this.pathTransitionTo = pathTransitionTo;
  }
}
