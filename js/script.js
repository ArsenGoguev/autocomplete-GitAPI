let template = document.querySelector("#tmpl")
let timer
let input = document.querySelector(".search-line")
let autocompleteList = document.querySelector(".autocomplete")
let resultList = document.querySelector(".result-list")

input.addEventListener("keyup", function (e) {
  clearTimeout(timer)
  timer = setTimeout(function () {
    let searchQuery = e.target.value

    if (searchQuery !== "") {
      fetch(`https://api.github.com/search/repositories?q=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => {
          let autocompleteResults = data.items.slice(0, 5)
          autocompleteList.innerHTML = ""

          autocompleteResults.forEach((item) => {
						let listItem = document.createElement("div")
						listItem.classList.add("autocomplete-item")
						listItem.setAttribute("data-owner", item.owner.login)
						listItem.setAttribute("data-stars", item.stargazers_count)

						listItem.textContent = item.name
						autocompleteList.append(listItem)
          })
        })
        .catch((error) => console.log(error))
    } else {
      autocompleteList.innerHTML = ""
    }
  }, 500)
})

autocompleteList.addEventListener("click", function (e) {
  let clickedItem = e.target
  let elem = template.content.cloneNode(true)

  elem.querySelector(".item-name").textContent = clickedItem.textContent
  elem.querySelector(".item-owner").textContent = clickedItem.dataset.owner
  elem.querySelector(".item-stars").textContent = clickedItem.dataset.stars

  resultList.append(elem)
  autocompleteList.innerHTML = ""
  input.value = ""
})

resultList.addEventListener("click", function (e) {
  if (e.target.classList.contains("item-remove")) {
    e.target.parentElement.remove()
  }
})