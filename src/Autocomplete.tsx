import React, { useState, useEffect, ChangeEvent, useRef } from 'react';

interface AutocompleteProps {
  suggestions: string[];
}

const Autocomplete: React.FC<AutocompleteProps> = ({ suggestions }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Mock asynchronous data fetching
    const fetchSuggestions = async () => {
      setIsFetching(true);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async call
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setIsFetching(false);
    };

    if (inputValue) {
      fetchSuggestions();
    } else {
      setFilteredSuggestions([]);
    }
  }, [inputValue, suggestions]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSelect = (suggestion: string) => {
    setInputValue(suggestion);
    setFilteredSuggestions([]); // Hide the suggestions list after selecting a suggestion
    inputRef.current?.focus(); // Set focus back to the input field
  };

  const renderSuggestionList = () => {
    if (isFetching) {
      return <div>Loading...</div>;
    }

    if (filteredSuggestions.length === 0) {
      return <div>No suggestions found.</div>;
    }

    return (
      <ul>
        {filteredSuggestions.map((suggestion) => (
          <li key={suggestion} onClick={() => handleSelect(suggestion)}>
            <span dangerouslySetInnerHTML={{ __html: highlightMatch(suggestion) }} />
          </li>
        ))}
      </ul>
    );
  };

  const highlightMatch = (suggestion: string) => {
    const startIndex = suggestion.toLowerCase().indexOf(inputValue.toLowerCase());
    const endIndex = startIndex + inputValue.length;
    const highlighted = `${suggestion.slice(0, startIndex)}<strong>${suggestion.slice(startIndex, endIndex)}</strong>${suggestion.slice(endIndex)}`;
    return highlighted;
  };

  return (
    <div className="autocomplete">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type here..."
      />
      {renderSuggestionList()}
    </div>
  );
};

export default Autocomplete;
