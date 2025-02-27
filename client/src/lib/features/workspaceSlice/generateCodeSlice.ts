import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the interface for the generate code state
interface GenerateCode {
  generatedCode: string;
}

// Set the initial state for the generate code slice
const initialState: GenerateCode = {
  generatedCode: "",
};

// Create the generate code slice
export const generateCodeSlice = createSlice({
  name: "generateCode",
  initialState,
  reducers: {
    // Reducer to set the generated code
    setGeneratedCode: (state, action: PayloadAction<string>) => {
      state.generatedCode = action.payload;
    },
  },
});

export const { 
    setGeneratedCode
 } = generateCodeSlice.actions;
export default generateCodeSlice.reducer;
