export const state = () => ({

})

export const actions = {
        async SOCKET_newMessage(ctx, msg) {
           console.log(`Message ${JSON.stringify(msg)}`);
         }
       };
