## PART 2 Questions with their respective answers


# 1. What is the difference between Component and PureComponent? Give an example where it might break my app.

Ans. 
In React, both Component and PureComponent are used to create reusable UI elements. The main difference lies in how they handle updates.

A regular Component re-renders whenever there is a change in state or props, regardless of whether the new values are different from the previous ones. This can lead to unnecessary re-renders, impacting performance.

In contrast, PureComponent implements a shouldComponentUpdate method with a shallow comparison of the component's state and props. It only re-renders when the new form or props differ from the previous ones. This optimization reduces unnecessary re-renders and can improve performance in some instances.

However, using PureComponent might break the app if you have complex data structures in the props or state. Shallow comparison checks only for changes in the top-level properties and does not deeply compare nested objects or arrays. If you use mutable data structures directly in props or state and modify them in place (e.g., arrays or objects), PureComponent might not detect the changes correctly, leading to stale UI or incorrect behavior.


# 2. Context + ShouldComponentUpdate might be dangerous. Why is that?
Ans. 
Using shouldComponentUpdate with the Context API can result in unexpected re-renders. The Context API causes all consuming components to re-render whenever there is a context update, regardless of whether shouldComponentUpdate returns false. This can lead to performance issues and unintended side effects, as components may update unnecessarily.

To address this, we should consider using more modern optimization techniques like React.memo for functional components or the useMemo hook for fine-grained control over re-renders when working with context updates. These alternatives offer a clearer and more predictable way to optimize component rendering without facing the risks associated with combining shouldComponentUpdate and the Context API.


# 3. Describe 3 ways to pass information from a component to its PARENT.
Ans.
Three ways to pass information from a child component to its parent component in React:
a. Props and Callbacks:
The most common way to pass information from a child component to its parent is by using props and callbacks. The parent component can pass down a function as a prop to the child component. The child component can then invoke this function with the necessary data as an argument, effectively passing information back to the parent.

b. Context API:
React's Context API allows to create a context that holds a value and pass it down to multiple levels of child components. The child component can then update this shared value, and any parent component that consumes the context will automatically receive the updated data.

c. Custom Events:
We can also use custom events to communicate from child to parent. In this approach, the child component dispatches a custom event, and the parent component listens for that event and handles it.


# 4. Give 2 ways to prevent components from re-rendering.
Ans.
a. useMemo hook:
The useMemo hook allows us to memoize expensive computations and prevent them from re-running on every render. It takes a function and an array of dependencies as arguments. The function is only re-executed when one of the dependencies changes. Otherwise, the useMemo hook returns the previously memoized value, preventing unnecessary re-computations.

b. shouldComponentUpdate lifecycle method:
For class components, we can implement the shouldComponentUpdate lifecycle method. This method allows us to control when a component should re-render by returning either true or false. If shouldComponentUpdate returns false, the component will not re-render. We can use this method to perform custom comparisons of the previous and next props and state to determine if an update is necessary.


# 5. What is a fragment and why do we need it? Give an example where it might break my app.
Ans.
In React, a fragment is a way to group multiple elements together without adding an extra wrapping element in the DOM. Fragments allow us to return multiple elements from a component's render method without introducing unnecessary parent elements. They are useful when we need to render multiple elements as siblings without adding an additional wrapping div or span.

In JSX, we can use the shorthand syntax <> ... </> or <React.Fragment> ... </React.Fragment> to create fragments.

Need for fragments:

a. Avoid Extra DOM Elements: Fragments allow us to group elements together without introducing extra DOM elements. This can help keep the rendered output cleaner and avoid unnecessary nesting in the DOM tree.

b. Avoid Unwanted Styles and Selectors: Wrapping elements with additional divs or spans can impact the layout and CSS styles of your application. Fragments prevent this interference and help maintain consistent styling.

c. Map and Loops: Fragments are particularly useful when using map or loops to render lists of elements. Without fragments, we would need to add a container element around each item, which could lead to invalid markup or unexpected layouts.

Example where it might break your app:

Fragments are generally safe to use and won't break the app. However, one potential issue to be aware of is when you use fragments within certain CSS frameworks or stylesheets that rely on specific parent-child relationships for styling or layout purposes.


# 6. Give 3 examples of the HOC pattern.
Ans.
Three examples of Higher-Order Component (HOC) patterns in React:

a. Authentication HOC:
An authentication HOC is used to restrict access to certain components based on the user's authentication status. It checks whether the user is logged in or not, and depending on that, it either renders the wrapped component or redirects to a login page.

b. Styling HOC:
A styling HOC can be used to add additional styles or CSS classes to a component. This allows us to reuse the same styling logic across different components.

c. Data Fetching HOC:
A data fetching HOC is used to fetch data from an API or external source and pass it as props to the wrapped component.


# 7. What's the difference in handling exceptions in promises, callbacks and async...await?
Ans.
The key difference in handling exceptions are:

> Promises and async/await offer a more structured and readable way of handling asynchronous code compared to callbacks, which can lead to "callback hell" or deeply nested code.

> With async/await, error handling follows the familiar try-catch pattern, making it easier to handle synchronous and asynchronous errors together.

> Promises and async/await handle errors individually at each level of the code, whereas with callbacks, error handling is done at the time the callback is invoked.

> Async/await is built on top of Promises, making it more powerful and easier to integrate with existing Promise-based code.

Overall, async/await is generally considered the preferred approach for handling asynchronous operations in modern JavaScript, as it provides better readability and maintainability compared to callbacks and also avoids some of the complexities of Promise chaining.

# 8. How many arguments does setState take and why is it async.
Ans.
In React, the setState function is used to update the state of a component. It takes two arguments:

a. Partial State Object or Function:
The first argument can be a partial state object, representing the state properties that need to be updated, or it can be a function that receives the previous state as an argument and returns the new state.

b. Callback (optional):
The second argument is an optional callback function that will be executed after the state has been updated and the component has been re-rendered.

setState is asynchronous in React for performance reasons and to batch state updates. When we call setState, React doesn't immediately update the state and re-render the component. Instead, it queues the state update and performs a batch update. This means that if we call setState multiple times within the same synchronous code block, React will batch the updates together and perform a single re-render at the end of the block, optimizing performance.


# 9. List the steps needed to migrate a Class to Function Component.
Ans.
Migrating a Class Component to a Function Component in React involves a few simple steps. Here's a step-by-step guide:

> Remove State:
In the class component, remove the state and any instance variables declared using this.state. Function components manage state using React Hooks like useState.

> Remove Lifecycle Methods:
Remove any lifecycle methods (e.g., componentDidMount, componentDidUpdate, componentWillUnmount, etc.) and replace them with corresponding React Hooks (e.g., useEffect).

> Convert Props:
Function components receive props as an argument, so we don't need to use this.props. Simply use the props directly within the function.

> Remove Render Method:
Since function components don't have a render() method, remove it and return the JSX directly from the function.

> Refactor Event Handlers:
If the class component has event handlers defined as instance methods (e.g., handleClick()), convert them to regular functions inside the function component.

> Use React Hooks:
Use appropriate React Hooks to handle state, effects, and any other component logic. Commonly used hooks include useState, useEffect, useContext, and useReducer.

> Import React and Other Dependencies:
Remember to import the React module if it's not automatically imported in the file. Also, make sure to import any other dependencies used in the function component.

> Test and Verify:
Test the function component thoroughly to ensure it behaves correctly and maintains the same functionality as the original class component.

Once we have completed these steps, your class component should be successfully migrated to a function component using React Hooks. Keep in mind that function components with Hooks are the preferred way of writing components in modern React applications, as they promote simpler and more concise code with better performance optimizations.


# 10. List a few ways styles can be used with components.
Ans.
Few ways styles can be used with components in React:

a. Inline Styles:
We can use inline styles by directly applying a style object to the style prop of a component.

b. CSS Modules:
CSS Modules allow us to write CSS styles in a separate file and import them as a JavaScript object in your component.

c. Styled Components:
Styled Components is a popular library that lets us define styles directly in your component using template literals.

d. CSS Frameworks:
We can use CSS frameworks like Bootstrap or Material-UI to style your components quickly by applying pre-designed styles and classes.

e. Global Styles:
We can also apply global styles using CSS files or CSS-in-JS libraries to style the entire application or specific elements consistently.


# 11. How to render an HTML string coming from the server.
Ans.
When we want to render an HTML string received from the server in a React component, we can use the dangerouslySetInnerHTML attribute. This attribute allows us to set the inner HTML of an element directly, treating the content as trusted HTML.

However, it is crucial to exercise caution when using dangerouslySetInnerHTML because it can lead to security vulnerabilities, specifically cross-site scripting (XSS) attacks. If the HTML content is not properly sanitized, malicious code within the HTML string can be executed, posing a threat to the application's security.

To mitigate these risks, it is best to sanitize the HTML content on the server-side before sending it to the client. We can use a library like DOMPurify to sanitize the HTML and make it safer for rendering in the React component. By doing so, we can ensure that the rendered content is safe and protect the application from potential XSS attacks.

