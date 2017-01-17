// ------------------------
// Views

export const MERGE_VIEW = "MERGE_VIEW" // when client receives a merge view event, it'll merge the view

export const mergeVIew = (view, diff, id = undefined) => ({
	type: MERGE_VIEW,
	diff,
	id
})

// dispatches a mergeView and also replace the entirety of the view because the diff has the set property
// set property has special handling in our diff.js file
export const setView = (view, data, id = undefined) => mergeVIew(view, {$set: data}, id);

// view constants
export const VIEW_APP = "VIEW_APP"; // global data about what sets are available, dispatch site wide messages
export const VIEW_LOBBY = "VIEW_LOBBY"; // lobby view
export const VIEW_GAME = "VIEW_GAME"; 
export const VIEW_PLAYER = "VIEW_PLAYER"; // each player can be a room, and other players only listen for this particular player's updates
