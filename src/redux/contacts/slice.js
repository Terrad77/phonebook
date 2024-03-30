import { createSlice } from '@reduxjs/toolkit';
import {
  addContact,
  deleteContact,
  fetchContacts,
  updateContact,
} from './operations';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    loading: false, //оновлення редюсера контактів для обробки завантаження
    error: false, //оновлення редюсера контактів для обробки помилок
  },
  //обробка  екшенів (fulfilled, rejected, pending) та зміна даних у стані
  extraReducers: builder =>
    builder
      // Обробка результатів операції fetchContacts
      .addCase(fetchContacts.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        // state.error = true;
        state.error = action.payload;
      })
      // Обробка результатів операції addContact
      .addCase(addContact.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      // Обробка результатів операції deleteContact
      .addCase(deleteContact.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          contact => contact.id !== action.payload
          // (item) => item.id !== action.payload.id
        );
      })
      .addCase(deleteContact.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      // Обробка результатів операції updateContact
      .addCase(updateContact.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const taskIndex = state.items.findIndex(
          item => item.id === action.payload.id
        );
        state.items[taskIndex] = action.payload;
      })
      .addCase(updateContact.rejected, state => {
        state.loading = false;
        state.error = true;
      }),
});

export default contactsSlice.reducer;
