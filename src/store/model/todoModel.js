import { action, thunk } from "easy-peasy";
import { navigate } from "../config/navigationRef";
import {FetchTodoService, UpdateTodoService, DeleteTodoService, CreateTodoService
} from '../services/todoServices'

const todoModel = {
    todos:[],
    requestResponse:null,
    isLoading : false,

    fetchTodos: thunk((Actions, nill,helpers) => {
      const authActions = helpers.getStoreActions(Action => Action.auth)
      Actions.toggleIsLoading();
      FetchTodoService()
        .then((data) => {
          if(data.status === 200){
              Actions.fetchSuccess(data.data.todos)
              Actions.toggleIsLoading(); 
              return
          }
          else if(data.status === 401){
              authActions.logout()
              return
          }
          else{
              Actions.updateRequestResponse(data.error);
              Actions.toggleIsLoading(); 
              return
          }
        })
    }),
    
    addTodo: thunk((Actions, data,helpers) => {
      Actions.toggleIsLoading();
      const authActions = helpers.getStoreActions(Action => Action.auth)
      CreateTodoService(data)
        .then((data) => {
          if(data.status === 200){
              Actions.fetchSuccess(data.data.todo)
              Actions.toggleIsLoading(); 
              navigate('Home')
          }
          else if(data.status === 401){
              authActions.auth.logout() 
          }
          else{
              Actions.updateRequestResponse(data.error);
              Actions.toggleIsLoading(); 
          }
      })
    }),
    deleteTodo : thunk((Actions,id,helpers) => {
      const authActions = helpers.getStoreActions(Action => Action.auth)
      Actions.toggleIsLoading();
      DeleteTodoService(id)
        .then((data) => {
          if(data.status === 200){
              Actions.fetchSuccess(data.data.todo)
              Actions.toggleIsLoading(); 
          
          }
          else if(data.status === 401){
              authActions.logout()
          }
          else{
              Actions.updateRequestResponse(data.error);
              Actions.toggleIsLoading(); 
          }
        })
    }),

    updateTodos: thunk((Actions, payload,helpers) => {
      const authActions = helpers.getStoreActions(Action => Action.auth)
      Actions.toggleIsLoading();
      UpdateTodoService(payload)
        .then((data) => {
          if(data.status === 200){
              Actions.fetchSuccess(data.data.todo)
              Actions.toggleIsLoading(); 
              return
          }
          else if(data.status === 401){
              authActions.logout()
              return
          }
          else{
              Actions.updateRequestResponse(data.error);
              Actions.toggleIsLoading(); 
          }
        })
    }),

    toggleIsLoading: action((state) => {
      state.isLoading = !state.isLoading;
     }),

    updateRequestResponse: action((state, payload) => {
      state.requestResponse = payload;
    }),

    clearResponse: action((state) => {
        state.requestResponse = null;
    }),

    fetchSuccess: action((state, payload)=> {
        state.todos = payload;
    }),
  }; 


export default todoModel