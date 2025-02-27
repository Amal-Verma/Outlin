import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DRAW, MOUSE } from "@/Enums/mouseEventsEnums";

// Define the interface for the board details state
interface BoardDetails {
  xref: number;
  yref: number;
  scale: number;
  mouseType: MOUSE;
  mouseDown: boolean;
  mouseX: number;
  mouseY: number;
  drawType: DRAW;
  KeyboardEvent: boolean;
}

// Set the initial state for the board details slice
const initialState: BoardDetails = {
  xref: 100,
  yref: 100,
  scale: 1,
  mouseType: MOUSE.NONE,
  mouseDown: false,
  mouseX: 0,
  mouseY: 0,
  drawType: DRAW.NONE,
  KeyboardEvent: true,
};

// Create the board details slice
export const boardDetails = createSlice({
  name: "boardDetails",
  initialState,
  reducers: {
    // Reducer to set the reference point
    setRefPoint: (
      state,
      action: PayloadAction<{ xref: number; yref: number }>
    ) => {
      state.xref = action.payload.xref;
      state.yref = action.payload.yref;
    },

    // Reducer to set the scale
    setScale: (state, action: PayloadAction<number>) => {
      state.scale = action.payload;
    },

    // Reducer to set the mouse type
    setMouseType: (state, action: PayloadAction<MOUSE>) => {
      state.mouseType = action.payload;
    },

    // Reducer to set the mouse point
    setMousePoint: (
      state,
      action: PayloadAction<{ mouseX: number; mouseY: number }>
    ) => {
      state.mouseX = action.payload.mouseX;
      state.mouseY = action.payload.mouseY;
    },

    // Reducer to set the mouse down state
    setMouseDown: (state, action: PayloadAction<boolean>) => {
      state.mouseDown = action.payload;
    },

    // Reducer to set the draw type
    setDrawType: (state, action: PayloadAction<DRAW>) => {
      state.drawType = action.payload;
    },

    // Reducer to set the keyboard event state
    setKeyboardEvent: (state, action: PayloadAction<boolean>) => {
      state.KeyboardEvent = action.payload;
    },
  },
});

// Export the actions and reducer
export const {
  setRefPoint,
  setScale,
  setMouseType,
  setMouseDown,
  setMousePoint,
  setDrawType,
  setKeyboardEvent,
} = boardDetails.actions;
export default boardDetails.reducer;
