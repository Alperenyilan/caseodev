import { defineStore } from "pinia";
import axios from "axios";

export const useCommunityTableStore = defineStore("tableCommunity", {
  state: () => ({
    communities: [],
  }),
  actions: {
    async getCommunities() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        const users = response.data;

        const postsResponse = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const posts = postsResponse.data;

        this.communities = users.map((user) => {
          const userPosts = posts.filter((post) => post.userId === user.id);
          return {
            id: user.id,
            name: user.name,
            baslik: user.address.city,
            Type: userPosts.length > 0 ? userPosts[0].title : "N/A",
            startDate:
              userPosts.length > 0
                ? new Date(userPosts[0].id * 1000000000)
                    .toISOString()
                    .split("T")[0]
                : "N/A",
          };
        });
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    },
    async addCommunity(community) {
      try {
        // Simulate adding community to the server
        const newCommunity = { ...community, id: Date.now() };
        this.communities.push(newCommunity);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    },
    async updateCommunity(updatedCommunity) {
      try {
        const index = this.communities.findIndex(
          (c) => c.id === updatedCommunity.id
        );
        if (index !== -1) {
          this.communities.splice(index, 1, updatedCommunity);
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    },
    async deleteCommunity(id) {
      try {
        this.communities = this.communities.filter((c) => c.id !== id);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    },
  },
});
