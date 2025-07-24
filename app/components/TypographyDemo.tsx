import React from 'react';

const TypographyDemo = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-bold mb-8">Tailwind Typography Demo</h1>

            {/* Basic prose */}
            <div className="prose">
                <h2>Basic Prose Styling</h2>
                <p>
                    This is a paragraph with some <strong>bold text</strong> and <em>italic text</em>.
                    You can also include <a href="#" className="text-blue-600 hover:text-blue-800">links</a>
                    and <code className="bg-gray-100 px-1 rounded">inline code</code>.
                </p>

                <ul>
                    <li>First list item</li>
                    <li>Second list item with <strong>bold text</strong></li>
                    <li>Third list item</li>
                </ul>

                <blockquote>
                    <p>This is a blockquote. It's great for highlighting important information or quotes.</p>
                </blockquote>
            </div>

            {/* Different prose sizes */}
            <div className="prose prose-sm">
                <h3>Small Prose</h3>
                <p>This is smaller text, perfect for compact layouts or sidebars.</p>
            </div>

            <div className="prose prose-lg">
                <h3>Large Prose</h3>
                <p>This is larger text, great for better readability on larger screens.</p>
            </div>

            {/* Code blocks */}
            <div className="prose">
                <h3>Code Examples</h3>
                <p>Here's how code blocks look:</p>
                <pre><code>{`function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`}</code></pre>
            </div>

            {/* Dark mode example */}
            <div className="prose dark:prose-invert">
                <h3>Dark Mode Prose</h3>
                <p>This prose automatically adapts to dark mode when the <code>dark:prose-invert</code> class is applied.</p>
            </div>
        </div>
    );
};

export default TypographyDemo;