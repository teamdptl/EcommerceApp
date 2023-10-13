package group.ql_chdm.Ultis;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.*;

public class CreateFile {
    private  static final String PATH_FOLDER ="C:\\Users\\ACER\\IdeaProjects\\QL_CHDM\\src\\main\\java\\group\\ql_chdm\\";
    public static void main(String[] args) {

        try {
            String pathFolder = PATH_FOLDER;
            Path modelPath = Path.of(pathFolder + "Entity");
            String repositoryPath = pathFolder + "Repository";
            String servicePath = pathFolder + "Service";
            WatchService watchService = FileSystems.getDefault().newWatchService();
            modelPath.register(watchService, StandardWatchEventKinds.ENTRY_CREATE);

            while (true) {
                WatchKey key = watchService.take();
                for (WatchEvent<?> event : key.pollEvents()) {
                    WatchEvent.Kind<?> kind = event.kind();
                    if (kind == StandardWatchEventKinds.ENTRY_CREATE) {
                        // Lấy tên tệp mới được tạo
                        String fileName = event.context().toString().replace(".java", "");
                        if (!fileName.contains("~")) {

                            File fileResponsitory = new File(repositoryPath+"\\" + fileName + "Responsitory.java");
                            File fileService = new File(servicePath+ "\\"+ fileName + "Service.java");
                            File fileImp = new File(servicePath+"\\" + fileName + "Imp.java");
                            if (!fileResponsitory.exists()) {
                                String contentResponsitory = " package group.ql_chdm.Repository; \n" +
                                        "import group.ql_chdm.Entity."+fileName+";\n"+
                                        "import org.springframework.data.jpa.repository.JpaRepository;\n" +
                                        "import org.springframework.stereotype.Repository;"+"import org.springframework.stereotype.Repository;\n" +
                                        "\n" +
                                        " @Repository"+
                                        "   public interface " + fileName + "Responsitory extends JpaRepository<"+fileName+",Integer>{\n" + "}";
                                fileResponsitory.createNewFile();

                                FileWriter writer = new FileWriter(fileResponsitory);
                                writer.write(contentResponsitory);
                                writer.close();
                            }
                            if (!fileImp.exists()) {
                                String contentImp= "package group.ql_chdm.Service;\n" +
                                        "import group.ql_chdm.Entity."+fileName+";\n" +
                                        "import org.springframework.stereotype.Component;\n" +
                                        "import java.util.List;\n" +
                                        "import java.util.Optional;\n" +
                                        "@Component\n" +
                                        "public class "+fileName+"Imp implements "+fileName+"Service{\n" +
                                        "}\n";
                                fileImp.createNewFile();
                                FileWriter writer = new FileWriter(fileImp);
                                writer.write(contentImp);
                                writer.close();
                            }

                            if (!fileService.exists()) {
                                String contentService = " package group.ql_chdm.Service\n;import org.springframework.stereotype.Service; \n" +
                                        " import group.ql_chdm.Entity." + fileName + "\n;    @Service \n public interface " + fileName + "Service extends RootService<" + fileName + "> {\n" + "}";
                                fileService.createNewFile();
                                FileWriter writerService = new FileWriter(fileService);
                                writerService.write(contentService);
                                writerService.close();
                            }
                        }
                    }
                }
                key.reset();
            }

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }


}