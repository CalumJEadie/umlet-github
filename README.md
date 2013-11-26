umlet-github
============

View UMLet diagrams within GitHub.

Install from Chrome Web Store: https://chrome.google.com/webstore/detail/umlet-github/paimimbkklhmfcbbgmhpfpjaikijhppl

Local development
-----------------

```
mvn package
export PORT=5000
java -cp target/classes:"target/dependency/*" UmletGithub
```

Research
--------

**How can we convert from UXF to a PNG?**

umlet-maven-plugin - Maven plugin that converts UMLet diagrams into images for site documentation.

https://github.com/ykryshchuk/umlet-maven-plugin

umlet-maven-plugin uses UMLet directly to provide the UXF to image conversion.

umlet-maven-plugin / com.kryshchuk.maven.plugins.umlet.ConvertDiagramMojo.java

```java
import com.baselet.diagram.DiagramHandler;
...
diagramHandler = new DiagramHandler(inputFile);
diagramHandler.getFileHandler().doExportAs("png", outputFile);
```

**Can UMLet and some custom Java be run on Heroku?**

https://devcenter.heroku.com/articles/intro-for-java-developers

https://devcenter.heroku.com/articles/run-non-web-java-processes-on-heroku

https://devcenter.heroku.com/articles/getting-started-with-java

**Will I need to create a web application in Java or can I write it in Python/web.py and call out to a Java process?**

Looks like will be able to get pretty far using the Jetty web server.

**How would you access UMLet from a Jetty web application?**

umlet-maven-plugin uses Maven to bring in requirements.

umlet-maven-plugin / pom.xml

```xml
...
<dependencyManagement>
    <dependencies>
        <dependency>
        <groupId>com.umlet</groupId>
        <artifactId>umlet</artifactId>
        <version>12.0</version>
  </dependency>
</dependencyManagement>
...
```

**How can Chrome extension access the web service?**

http://developer.chrome.com/extensions/xhr.html

Use message passing.

http://developer.chrome.com/extensions/messaging.html

http://developer.chrome.com/extensions/background_pages.html
