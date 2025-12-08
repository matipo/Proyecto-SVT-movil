import { View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { CloseIcon, SearchIcon } from "./Icons";


interface SearchBarProps {
  onSearch: (text: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const toggleSearch = () => {
    if (isSearchOpen) {
      setSearchText("");
      onSearch("");
    }
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchSubmit = () => {
    onSearch(searchText);
  };

  if (isSearchOpen) {
    return (
      <View className="h-10 w-64 flex-row rounded-lg bg-slate-100">
        <TextInput
          className="flex-1 px-3 text-black"
          placeholder="Buscar un evento..."
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
            onSearch(text);
          }}
          autoFocus={true}
          onSubmitEditing={handleSearchSubmit}
          returnKeyType="search"
        />

        <TouchableOpacity onPress={toggleSearch} className="p-2">
          <CloseIcon color="grey" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={toggleSearch} className="mr-[-5px] p-2">
      <SearchIcon color="red" />
    </TouchableOpacity>
  );
}
