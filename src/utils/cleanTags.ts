const cleanTags = (tags: string[]) => {
  return tags.filter((tag) => tag.trim() !== "")
}

export default cleanTags
