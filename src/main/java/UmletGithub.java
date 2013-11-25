import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.*;
import java.io.File;
import java.io.FileWriter;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.*;

// Umlet
import com.baselet.control.Constants.Program;
import com.baselet.control.Constants.RuntimeType;
import com.baselet.diagram.DiagramHandler;
import com.baselet.diagram.io.OutputHandler;

/**
 * UMLet interaction code based on
 * http://ykryshchuk.github.io/umlet-maven-plugin/
*/
public class UmletGithub extends HttpServlet {
			
    private String EXAMPLE_1 = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n"
        + "<diagram program=\"umlet\" version=\"12.0\">\n"
        + "  <zoom_level>10</zoom_level>\n"
        + "  <element>\n"
        + "    <type>com.umlet.element.Class</type>\n"
        + "    <coordinates>\n"
        + "      <x>160</x>\n"
        + "      <y>150</y>\n"
        + "      <w>180</w>\n"
        + "      <h>100</h>\n"
        + "    </coordinates>\n"
        + "    <panel_attributes>Chrome Extension\n"
        + "--\n"
        + "Monkey patches GitHub\n"
        + "pages displaying a\n"
        + "UMLet UXF file as XML\n"
        + "to display it as a PNG.</panel_attributes>\n"
        + "    <additional_attributes/>\n"
        + "  </element>\n"
        + "  <element>\n"
        + "    <type>com.umlet.element.Class</type>\n"
        + "    <coordinates>\n"
        + "      <x>400</x>\n"
        + "      <y>150</y>\n"
        + "      <w>180</w>\n"
        + "      <h>100</h>\n"
        + "    </coordinates>\n"
        + "    <panel_attributes>Web Service\n"
        + "--\n"
        + "Converts UMLet UXF\n"
        + "files into PNG's.</panel_attributes>\n"
        + "    <additional_attributes/>\n"
        + "  </element>\n"
        + "  <element>\n"
        + "    <type>com.umlet.element.Relation</type>\n"
        + "    <coordinates>\n"
        + "      <x>310</x>\n"
        + "      <y>180</y>\n"
        + "      <w>110</w>\n"
        + "      <h>50</h>\n"
        + "    </coordinates>\n"
        + "    <panel_attributes>lt=&lt;-&gt;</panel_attributes>\n"
        + "    <additional_attributes>30;30;90;30</additional_attributes>\n"
        + "  </element>\n"
        + "</diagram>";

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        String diagramUXF = this.EXAMPLE_1;

        // Get an output stream suitable for writing binary
        // data to the client.
        ServletOutputStream respOutputStream = resp.getOutputStream();

        // Umlet should behave as if running from command line, e.g.
        // as if being called by
        // "-action=convert -format=svg -filename=inputfile.uxf"
        Program.RUNTIME_TYPE = RuntimeType.BATCH;

        // OutputHandler performs conversion from UXF to SVG and
        // requires DiagramHandler object for representing a UXF
        // document, which requires that the UXF is accessible
        // through a File interface.
        //
        // Create a temporary file and write UXF to it.

        // Take hash of UXF for good enough uniqueness.
        String tempSuffix = new Integer(diagramUXF.hashCode()).toString();
        File temp = File.createTempFile(tempSuffix, ".tmp");
        FileWriter tempWriter = new FileWriter(temp);
        tempWriter.write(diagramUXF);
        tempWriter.close();
        
        System.out.println(temp);
        
        DiagramHandler diagramHandler = new DiagramHandler(temp);

        // Convert to SVG and write out binary data to client.
        try {
			OutputHandler.createToStream("svg", respOutputStream, diagramHandler);
		} catch (Exception e) {
			throw new ServletException(e); 
		}

        // Flush to commit the response.
        respOutputStream.flush();
    }

    public static void main(String[] args) throws Exception{
        Server server = new Server(Integer.valueOf(System.getenv("PORT")));
        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        context.setContextPath("/");
        server.setHandler(context);
        context.addServlet(new ServletHolder(new UmletGithub()),"/*");
        server.start();
        server.join();
    }

}
