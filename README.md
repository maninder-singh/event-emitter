# event-emitter

A custom utility for managing events using vanila javascript.

## Methods

* subscribe 

This method accept event name and callback function and return unique event id. 

```
EventEmitter.subscribe("EventName",function(){console.log("Callback function")});
```

* unsubscribe 

This method accept either event id or event name. If event id is provided then particular listener is unsubscribe
and if event name is provided then all listeners unsubscribe to particular event name.


```
By event id  - EventEmitter.unsubscribe(121221212232);

By event name  - EventEmitter.unsubscribe(EventName);

```

* notify

This method accept event name and optional data and notify to all the listeners with data.

```
EventEmitter.notify(EventName,{});
```
