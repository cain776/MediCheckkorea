plugins {
    java
    id("org.springframework.boot") version "4.0.5"
    id("io.spring.dependency-management") version "1.1.7"
}

group = "kr.or.kmtpa"
version = "0.1.0-SNAPSHOT"

// 협회 backend-java 와 같은 이유다 — Windows 의 Java @argfile 은 비ASCII 프로젝트 경로가
// 긴 classpath 에 섞이면 클래스를 못 찾는다. 이 저장소 경로에 한글이 들어 있으므로
// 빌드 산출물만 ASCII 임시 경로로 보낸다.
layout.buildDirectory = file("${System.getProperty("java.io.tmpdir")}/medicheck-build")

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

tasks.withType<JavaCompile>().configureEach {
    options.encoding = "UTF-8"
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-jdbc")
    implementation("org.springframework.boot:spring-boot-starter-flyway")
    runtimeOnly("org.xerial:sqlite-jdbc:3.49.1.0")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.withType<Test> {
    useJUnitPlatform()
}
