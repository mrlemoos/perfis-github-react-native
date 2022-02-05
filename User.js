import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const UserRepos = ({ repos, user }) => {
  const [verMais, setVerMais] = React.useState(false);

  const handlePress = () => {
    setVerMais((prev) => !prev);
  };

  if (repos.length === 0) {
    return <Text>Usuário não possui repositórios públicos</Text>;
  }

  const repoList = React.useMemo(
    () => (verMais ? repos : repos.slice(0, 5)),
    [verMais, repos]
  );

  return (
    <View>
      {repoList.map((repo) => (
        <View key={`${repo.name}${user}`} style={styles.repoDisplay}>
          <Text>{repo.name}</Text>
        </View>
      ))}
      {repos.length > 5 && (
        <TouchableOpacity style={styles.verMaisButton} onPress={handlePress}>
          <Text>{verMais ? "Ler menos" : `Ler mais por ${user}`}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const User = ({ user }) => {
  const [isLoading, setLoading] = React.useState(true);
  const [repos, setUserRepos] = React.useState([]);

  React.useEffect(() => {
    async function buscarRepos() {
      const res = await fetch(`https://api.github.com/users/${user}/repos`, {
        method: "GET",
      });
      const repos = await res.json();

      setUserRepos(repos);
      setLoading(false);
    }
    buscarRepos();
  }, []);

  return (
    <View key={user} style={styles.userDataContainer}>
      <View style={styles.userRow}>
        <Image
          style={styles.userAvatar}
          source={{
            uri: `https://github.com/${user}.png`,
          }}
        />
        <Text style={styles.username}>{user}</Text>
      </View>
      {isLoading ? (
        <Text>Carregando dados do usuário {user}...</Text>
      ) : (
        <UserRepos repos={repos} user={user} />
      )}
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userAvatar: {
    height: 46,
    width: 46,
    borderRadius: 23,
    marginRight: 8,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  userDataContainer: {
    marginBottom: 24,
  },
  repoDisplay: {
    padding: 6,
  },
  verMaisButton: {
    padding: 8,
  },
});
