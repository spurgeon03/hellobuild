import { useLocalStorage } from "./useLocalStorage";

function useUser(){
    const {
        item: user,
        saveItem,
    } = useLocalStorage('USER_V1', {githubUser: ''});

    const existGitHubUser = () => {
        return user.githubUser.length > 0 ? true : false;
    }

    const saveGitHubUsername = (username) => {
        saveItem({githubUser: username});
    }

    const getGitHubUser = () => {
        return user?.githubUser;
    }

      return {
        getGitHubUser,
        existGitHubUser,
        saveGitHubUsername,
      };
}

export { useUser };