# Zippin React SDK

React component for the Zippin API.

## Install

```bash
npm install @zippin/react
# or
yarn add @zippin/react
```

## Setup

First, you'll need an API key. You can create an API key in the [Zippin Dashboard](https://zippin.dev).

```js
import { Dropzone } from '@zippin/react';
```

## Usage

Create your custom dropzone:

```jsx
<Dropzone apiKey="YOUR_API_KEY">
  {/* Your styled dropzone */}
</Dropzone>
```

## Props

Commonly used props include:

- `accept` - accepted file types
- `apiKey` - your Zippin API key
- `autoFocus` - focus the root element on render
- `bucket` - specify which Zippin bucket to upload files to
- `disabled` - disable the dropzone
- `onDrop` - handle drop events
- `onError` - handle errors during file uploads
- `onUpload` - handle successful file uploads
- `maxSize` - maximum file size in bytes
- `noClick` - disable click to open the native file selection dialog
- `noDrag` - disable drag 'n' drop
- `noKeyboard` - disable SPACE/ENTER to open the native file selection dialog

## Handle uploads

Update a user's avatar:

```jsx
<Dropzone
  accept="image/*"
  apiKey="YOUR_API_KEY"
  onUpload={(file) => updateUser({ avatar: file.url })}
>
  {/* Your styled dropzone */}
</Dropzone>
```

## Create new buckets

Start by creating a new bucket in the [Zippin Dashboard](https://zippin.dev/buckets). When creating a bucket, you can select the storage class, location, and accepted file types. In this example, an `avatars` bucket was created that accepts `image/*` files:

```jsx
<Dropzone
  accept="image/*"
  apiKey="YOUR_API_KEY"
  bucket="avatars"
  onUpload={(file) => updateUser({ avatar: file.url })}
  onError={() => alert('Please upload an image!')}
>
  {/* Your styled dropzone */}
</Dropzone>
```

## License

MIT License
