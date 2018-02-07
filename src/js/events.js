export const addGlobalEvent = function(context, target, event, callback) {
  const eventName = event.slice(2).toLowerCase();
  const bound = callback.bind(context);
  context["_bound_" + event] = bound;
  target.addEventListener(eventName, bound);
  return bound;
}

export const removeGlobalEvent = function(context, target, event) {
  const eventName = event.slice(2).toLowerCase();
  const boundEventName = context["_bound_" + event];
  delete context["_bound_" + event];
  target.removeEventListener(eventName, boundEventName);
  return eventName;
}