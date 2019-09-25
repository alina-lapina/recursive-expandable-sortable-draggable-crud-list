import React, {useState, useReducer, useEffect} from "react";
import "./list.css"

export const List = ({
                         items = [],
                         controls = {
                             expand: {
                                 before: true},
                             include: {
                                 after: true,
                                 callback: (i) => console.log("include", i.title)}}
                     }) => {

    const list = useList(items);
    useEffect(() => console.log({ list_update: list.items }),[list.items]);

    return (
            <ul className="list">
                {list.items.map((item, i) =>
                    <ListItem key={i} origin={item}
                              modifier={list.modify}
                              controls={controls} />)
                }
            </ul>
    )
};

export const ListItem = ({controls, origin, modifier}) => {

    const state = useItem(origin);
    useEffect(() => console.log({ item_update: state.item }),[state.item]);

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
                controls={filterControls("before")}
            />
            <span>{state.item.title}</span>
            <Controls
                state={state}
                controls={filterControls("after")}
            />
            {state.item.expanded && <List items={state.item.children} controls={controls} />}
        </li>
    )
};

export const Controls = ({state, controls}) => {
    return (
        <span>
            {controls.include &&
                <input type="checkbox" name="include" checked={state.item.checked}
                       onChange={() => {
                            state.modify({action: "toggleChecked"});
                            controls.include.callback(state.item);
                        }} />
            }
            {controls.expand && state.item.children && state.item.children.length > 0 &&
                <button onClick={() => state.modify({action: "toggleExpand"})}>
                    {state.item.expanded ? "ᐃ" : "ᐁ"}
                </button>
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
                state[data].expanded = !state[data].expanded;
                return [...state];
            }
            case "toggleChecked": {
                state[data].checked = !state[data].checked;
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