---
layout: default
---
{% assign Section-Image-Text = page.['Section Image Text'] %}
{% assign sectionImage = Section-Image-Text.[0].Image %}
{% assign sectionTitle = Section-Image-Text.[0].Title %}
{% assign sectionDescription = Section-Image-Text.[0].Description %}
{% assign sectionButton = Section-Image-Text.[0].Button %}

{% assign sectionImageTwo = Section-Image-Text.[1].Image %}
{% assign sectionTitleTwo = Section-Image-Text.[1].Title %}
{% assign sectionDescriptionTwo = Section-Image-Text.[1].Description %}
{% assign sectionButtonTwo = Section-Image-Text.[1].Button %}

{% assign sectionSingleImage = page.['Section Single Image'] %}

{% include cd-section-title-text.html
  line-one="Make your product"
  line-two="Multiplayer"
  reaction-one="call-me"
  reaction-two="wave"
  reaction-three="claps"
  description="Cord’s <span class='droplet'>Collaboration API</span> adds the best collaborative features to your product – all with a single line of Javascript just a few lines of code."
%}

{% include cd-section-image-text.html
  image=sectionImage
  title=sectionTitle
  description=sectionDescription
  button=sectionButton
%}

{% include cd-section-title-text.html
  line-one="Collaborative Product"
  line-two="Grow Faster"
  reaction-one="thumb"
  reaction-two="point"
  reaction-three="praise"
  description="Full of everything teams need: <span class='droplet'>chat, presence, annotations</span> and integrations with task managers and Slack. Add collaboration to your product that will continuously evolve and improve."
%}

{% include cd-section-single-image.html
  image=sectionSingleImage
%}

{% include cd-section-title-text.html
  line-one="Feature rich customizable"
  line-two="collaboration"
  reaction-one="thumb"
  reaction-two="point"
  reaction-three="praise"
  description="Cord’s <span class='droplet'>Collaboration API</span> adds the best collaborative features to your product – all with a single line of Javascript just a few lines of code."
%}

{% include cd-section-image-text.html
  image=sectionImageTwo
  title=sectionTitleTwo
  description=sectionDescriptionTwo
  button=sectionButtonTwo
%}

{% include cd-section-creds.html %}
{% include cd-section-quote.html %}

{% include cd-section-image-text.html
  image=sectionImage
  title=sectionTitle
  description=sectionDescription
  button=sectionButton
%}

{% include cd-section-onwards.html %}
