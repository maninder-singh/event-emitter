let EventEmitter = (() => {

    let _events = {};
    let _eventsById = {};

    let subscribe = (eventName,callback) => {
        if(!eventName){
            throw new Error("Event name should not be empty , null or undefined");
        }

        if(typeof callback !== "function"){
            throw new Error("Callback should be a function");
        }

        if(!_events.hasOwnProperty(eventName)){
            _events[eventName] = [];
        }
        let _id = Date.now();
        _events[eventName].push({
            "id":_id,"callback":callback
        });
        _eventsById[_id] = eventName;
        console.log("Listener subscribe successfully");
        return _id;
    };

    let unsubscribe = (id,eventName) => {
        if(id){
            // Unsubscribe listener based on id
            let _eventName = _eventsById[id];
            if(_eventName){
                if(_events.hasOwnProperty(_eventName)){
                    _events[_eventName] = _events[_eventName].filter((event) => {
                        return event.id !== id;
                    });
                }
                delete _eventsById[id];
            }
            console.log("Listener unsubscribe successfully by id");
            return;
        }

        if(eventName){
            // Unsubscribe all listeners
            if(_events.hasOwnProperty(eventName)){
                _events[eventName] = [];
                _eventsById = Object.keys(_eventsById).reduce((o,i) => {
                    if(_eventsById[i] !== eventName){
                        o[i] = _eventsById[i];
                    }
                    return o;
                },{});
            }
            console.log("Listeners unsubscribe successfully by event name");
        }
    };

    let notify = (eventName,data) => {
        if(!eventName){
            throw new Error("Event name should not be empty , null or undefined");
        }

        if(_events.hasOwnProperty(eventName)){
            _events[eventName].forEach((event) => {
                event.callback.call(undefined,data);
            });
        }
        console.log("Successfully notify all listeners");
    };

    return {
        "subscribe":subscribe,
        "unsubscribe":unsubscribe,
        "notify":notify
    };
})();
