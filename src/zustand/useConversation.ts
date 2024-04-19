import { create } from "zustand";
import { Message, UserData } from "../utils/interfaces/inteface";

interface ConversationState {
  selectedConversation: UserData | undefined;
  messages: Message[];
  reload: boolean;
}

interface ConversationActions {
  setSelectedConversation: (selectedConversation: UserData | undefined) => void;
  setMessages: (messages: Message[]) => void;
  setReload: (reload: boolean) => void;
}

const useConversation = create<ConversationState & ConversationActions>(
  (set) => ({
    selectedConversation: undefined,
    messages: [],
    reload: false,
    setSelectedConversation: (selectedConversation) =>
      set((state) => ({ ...state, selectedConversation })),
    setMessages: (messages) => set((state) => ({ ...state, messages })),
    setReload: (reload) => set((state) => ({ ...state, reload })),
  })
);

export default useConversation;
