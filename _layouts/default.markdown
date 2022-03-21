<!DOCTYPE html>
<html>

  {% include head.html %}

  <body class="layout--{{page.layout}}">
    <div class="bg"></div>

    {% include header.html %}

        {{ content }}

    {% include footer.html %}

  </body>

</html>
