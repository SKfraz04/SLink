import React, { useEffect, useState } from 'react';
import ImageUpload from "../Components/ImageUpload"

const socialMedia = {
  "Facebook": ["https://cdn2.iconfinder.com/data/icons/social-hand-drawn-icons/64/social_55-128.png", "https://www.facebook.com/%s", "Facebook page's username"],
  "Patreon": ["https://cdn4.iconfinder.com/data/icons/social-hand-drawn-icons/64/patreon-128.png", "https://www.patreon.com/%s", "Patreon page's username"],
  "Twitter": ["https://cdn2.iconfinder.com/data/icons/social-hand-drawn-icons/64/social_54-128.png", "https://twitter.com/%s", "Twitter username"],
  "DeviantArt": ["https://cdn2.iconfinder.com/data/icons/social-hand-drawn-icons/64/social_12-128.png", "http://%s.deviantart.com/", "DeviantArt username"],
  "YouTube": ["https://cdn2.iconfinder.com/data/icons/social-hand-drawn-icons/64/social_51-128.png", "https://www.youtube.com/channel/%s", "YouTube channel ID"],
  "Twitch": ["https://cdn2.iconfinder.com/data/icons/social-hand-drawn-icons/64/social_36-128.png", "https://www.twitch.tv/%s", "Twitch username"],
  "Instagram": ["https://cdn2.iconfinder.com/data/icons/social-hand-drawn-icons/64/social_50-128.png", "https://www.instagram.com/%s", "Instagram username"],
  "E-Mail": ["https://cdn2.iconfinder.com/data/icons/social-hand-drawn-icons/64/social_43-128.png", "mailto:%s", "E-mail address"]
};

const SocialMediaLinks = () => {
  const [code, setCode] = useState('');
  const [preview, setPreview] = useState('');

  useEffect(() => {
    const generateCode = () => {
      let input = "";
      const socialMediaTypes = [];
      const usernames = [];
      const socialMediaSelect = document.querySelectorAll('.socialMediaType');
      const usernameInputs = document.querySelectorAll('.username');
      socialMediaSelect.forEach(select => socialMediaTypes.push(select.value));
      usernameInputs.forEach(input => usernames.push(input.value));

      for (let i = 0; i < socialMediaTypes.length; i++) {
        if (usernames[i] !== "") {
          const socialMediaType = socialMedia[socialMediaTypes[i]];
          input += `<a href="${socialMediaType[1].replace('%s', usernames[i])}"><img src="${socialMediaType[0]}" width="25px" height="25px"></a> `;
          if (document.getElementById("vertical_checkbox").checked) {
            input += '<br>';
          }
        }
      }

      setCode(input);
      setPreview(input);
    };

    const wrapper = document.querySelector(".input_fields_wrap");
    const add_button = document.querySelector(".add_field_button");
    let x = 1;

    add_button.addEventListener('click', (e) => {
      e.preventDefault();
      const removeFieldButtons = document.querySelectorAll('.remove_field, .move_up, .move_down');
      removeFieldButtons.forEach(button => button.style.display = 'block');

      if (x < max_fields) {
        x++;
        wrapper.insertAdjacentHTML('beforeend', '<div class="input_fields">' + fields + ' <a href="#" class="remove_field"><i class="fa fa-minus-circle" aria-hidden="true"></i></a><a href="#" class="move_up"><i class="fa fa-chevron-circle-up" aria-hidden="true"></i></a><a href="#" class="move_down"><i class="fa fa-chevron-circle-down" aria-hidden="true"></i></a></div>');
      }
    });

    wrapper.addEventListener('change', (e) => {
      if (e.target.classList.contains('socialMediaType')) {
        const placeholder = socialMedia[e.target.value][2];
        e.target.nextElementSibling.setAttribute('placeholder', placeholder);
      }
      generateCode();
    });

    wrapper.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove_field')) {
        if (x !== 1) {
          e.preventDefault();
          const parentDiv = e.target.parentNode;
          parentDiv.remove();
          x--;
          if (x === 1) {
            const removeFieldButtons = document.querySelectorAll('.remove_field, .move_up, .move_down');
            removeFieldButtons.forEach(button => button.style.display = 'none');
          }
        }
        generateCode();
      }

      if (e.target.classList.contains('move_up')) {
        e.preventDefault();
        const currentIndex = Array.from(e.target.parentNode.parentNode.children).indexOf(e.target.parentNode) + 1;
        const aboveIndex = currentIndex - 1;
        wrapper.insertBefore(e.target.parentNode, wrapper.children[aboveIndex]);
      }

      if (e.target.classList.contains('move_down')) {
        e.preventDefault();
        const currentIndex = Array.from(e.target.parentNode.parentNode.children).indexOf(e.target.parentNode) + 1;
        const belowIndex = currentIndex + 1;
        wrapper.insertBefore(e.target.parentNode, wrapper.children[belowIndex]);
      }

      generateCode();
    });

    const max_fields = 6;
    const fields = '<select class="socialMediaType">' + Object.keys(socialMedia).map((key) => `<option value="${key}">${key}</option>`).join('') + '</select> <input type="text" class="username" placeholder="Facebook page\'s username">';

    wrapper.innerHTML = '<div class="input_fields">' + fields + ' <a href="#" class="remove_field" hidden><i class="fa fa-minus-circle" aria-hidden="true"></i></a><a href="#" class="move_up" hidden><i class="fa fa-chevron-circle-up" aria-hidden="true"></i></a><a href="#" class="move_down" hidden><i class="fa fa-chevron-circle-down" aria-hidden="true"></i></a></div>';
  }, []);
  return (
    <div className="content">
      <div className="left_side">
      <ImageUpload />
        <a href="/" className="add_field_button">
          <i className="fa fa-plus-circle" aria-hidden="true" /> Add Social Media
        </a>
        <input type="checkbox" id="vertical_checkbox" /><span style={{ fontSize: '14px', verticalAlign: 'text-top', display: "none" }}>Vertical Layout</span>
        <div className="input_fields_wrap"></div>
      </div>
      <div className="right_side">
        <textarea id="codeBox" value={code} onChange={(e) => setCode(e.target.value)} className='d-none'></textarea>
        <div id="preview" dangerouslySetInnerHTML={{ __html: preview }}></div>
      </div>
    </div>
  );
};

export default SocialMediaLinks;

