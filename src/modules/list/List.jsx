import React, {useState, useReducer, useEffect} from "react";
import "./list.css"

export const List = ({items = [],
                         controls = {
                             expand: {before: true},
                             include: {after: true,
                                 callback: (i) => console.log("include", i.title)}}
                     }) => {

    return (
        <ul className="list">
            {items.map((item, i) =>
                <ListItem key={i} item={item} controls={controls} />)}
        </ul>
    )
};

export const ListItem = ({controls, item}) => {
    const [state, setState] = useState(item);

    function filterControls(property) {
        return Object.keys(controls).reduce((p, c) => {
            if (controls[c][property]) p[c] = controls[c];
            return p;
        }, {})
    }

    return (
        <li>
            <Controls
                state={state}
                setState={(i)=> setState(i)}
                controls={filterControls("before")}
            />
            <span>{item.title}</span>
            <Controls
                state={state}
                setState={(i)=> setState(i)}
                controls={filterControls("after")}
            />
            {state.expanded && <List items={item.children} controls={controls} />}
        </li>
    )
};

export const Controls = ({state, setState, controls}) => {
    return (
        <span>
            {controls.expand && state.children && state.children.length > 0 &&
            <button onClick={() => {
                state.expanded = !state.expanded;
                setState({...state});}}>
                {state.expanded ? "ᐃ" : "ᐁ"}
            </button>
            }

            {controls.include &&
            <input type="checkbox" name="include" checked={state.checked}
                   onChange={() => {
                       state.checked = !state.checked;
                       setState({...state});
                       controls.include.callback(state);
                   }} />
            }
    </span>)
};

export const useList = (init) => {
    function listReducer(state, {action, data}) {
        switch (action) {
            case "reset": {
                return init;
            }
            case "toggleExpand": {
                data.expanded = !data.expanded;
                return [...state];
            }
            case "toggleChecked": {
                data.checked = !data.checked;
                return [...state];
            }
            default:
                return state;
        }
    }
    const [items, modify] = useReducer(listReducer, init);

    return {items, modify};
};

export const useItem = (init) => {
    function itemReducer(state, {action, data}) {
        switch (action) {
            case "reset": {
                return init;
            }
            case "toggleExpand": {
                return {...state, expanded: !state.expanded};
            }
            case "toggleChecked": {
                return {...state, checked: !state.checked};
            }
            default:
                return state;
        }
    }
    const [item, modify] = useReducer(itemReducer, init);

    return {item, modify};
};