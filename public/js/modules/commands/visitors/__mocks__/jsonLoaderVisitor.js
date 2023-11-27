
export const JsonLoaderVisitor = jest.fn().mockImplementation(function(){
    this.initialize_pending_commands =  jest.fn();  
})