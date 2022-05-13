import { validateCreate } from "../src/validator/studyProgramme.validator";

// validateCreate tests
test(`studyProgramme.validator.js - validateCreate`, () => {

    // valid
    expect(validateCreate({
        name: "Softwarový vývoj",
        description: "Popis studijního programu Softwarový vývoj.",
        supervisor: "6223e7f276b80392760dea94",
        degree: "Bc.",
        students: ["6222278da6d5a9361cbabf3a", "6223e7f276b80392760dea94", "62726f560b2192c52937bca9"]
    })).toBe(true);

    // valid
    expect(validateCreate({
        name: "Softwarový vývoj",
        description: "Popis studijního programu Softwarový vývoj.",
        supervisor: "6223e7f276b80392760dea94",
        degree: "Ing.",
        students: ["6222278da6d5a9361cbabf3a"]
    })).toBe(true);

    // name - have to be string
    expect(validateCreate({
        name: 9,
        description: "Popis studijního programu Softwarový vývoj.",
        supervisor: "6223e7f276b80392760dea94",
        degree: "Bc.",
        students: ["6222278da6d5a9361cbabf3a", "6223e7f276b80392760dea94"]
    })).toBe(false);

    // name - missing key name
    expect(validateCreate({
        description: "Popis studijního programu Softwarový vývoj.",
        supervisor: "6223e7f276b80392760dea94",
        degree: "Bc.",
        students: ["6222278da6d5a9361cbabf3a", "6223e7f276b80392760dea94"]
    })).toBe(false);
    
    // name - empty value
    expect(validateCreate({
        name: "",
        description: "Popis studijního programu Softwarový vývoj",
        supervisor: "6223e7f276b80392760dea94",
        degree: "Bc.",
        students: ["6222278da6d5a9361cbabf3a", "6223e7f276b80392760dea94"]
    })).toBe(false);

    // name - more than 255 chars
    expect(validateCreate({
        name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id rutrum mi. Donec maximus semper ligula id iaculis. Fusce mattis, nisl sed luctus condimentum, mi ex mollis tellus, quis molestie enim nisi vel justo. Aliquam dictum et mauris sed consectetur. In id mattis velit.",
        description: "Popis studijního programu Softwarový vývoj.",
        supervisor: "6223e7f276b80392760dea94",
        degree: "Bc.",
        students: ["6222278da6d5a9361cbabf3a", "6223e7f276b80392760dea94"]
    })).toBe(false);

    // description - have to be string
    expect(validateCreate({
        name: "Softwarový vývoj",
        description: 9.43,
        supervisor: "6223e7f276b80392760dea94",
        degree: "Bc.",
        students: ["6222278da6d5a9361cbabf3a", "6223e7f276b80392760dea94"]
    })).toBe(false);

    // description - empty string
    expect(validateCreate({
        name: "Softwarový vývoj",
        description: "",
        supervisor: "6223e7f276b80392760dea94",
        degree: "Bc.",
        students: ["6222278da6d5a9361cbabf3a", "6223e7f276b80392760dea94"]
    })).toBe(false);

    // description - more than 4000 chars
    expect(validateCreate({
        name: "Softwarový vývoj",
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id rutrum mi. Donec maximus semper ligula id iaculis. Fusce mattis, nisl sed luctus condimentum, mi ex mollis tellus, quis molestie enim nisi vel justo. Aliquam dictum et mauris sed consectetur. In id mattis velit. Maecenas nec mi et justo ultricies venenatis. Nunc nec elit ut erat scelerisque semper. Pellentesque a justo nunc. Proin semper neque sit amet auctor pharetra. Sed nibh leo, consequat vitae vestibulum sit amet, blandit a nulla. Proin rutrum ullamcorper pharetra. Sed diam magna, ornare sit amet ultrices nec, volutpat quis metus. Duis tortor dui, mollis sit amet imperdiet a, rutrum ut urna. Phasellus feugiat et risus nec faucibus. Curabitur tempus purus metus, ac luctus ipsum dictum vitae. Nullam metus lectus, congue vel dignissim accumsan, gravida ut massa. Aliquam rhoncus, ex id luctus scelerisque, eros sem convallis libero, vel vulputate eros justo eget nisl. Donec lacus justo, pellentesque ac lectus rutrum, rutrum sagittis nisi. Phasellus vel diam eget arcu bibendum pulvinar euismod quis arcu. Nulla turpis neque, posuere vel bibendum et, pretium et nunc. Duis ac dolor malesuada, tristique ipsum quis, sollicitudin tellus. In faucibus mi sit amet tellus dapibus scelerisque. Praesent id sem mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam vel augue urna. Fusce ac justo sodales, ornare purus nec, vulputate turpis. Sed rhoncus, purus ut ultricies varius, magna magna convallis augue, id volutpat massa nibh ut purus. Integer facilisis elementum rhoncus. Praesent id libero in arcu accumsan tristique. Curabitur sit amet tempus velit, vitae viverra mauris. Phasellus nec lectus dui. Morbi at molestie dolor. Praesent lobortis et risus vel maximus. Donec mauris nisi, lacinia sit amet commodo id, hendrerit id erat. Morbi molestie tellus quis interdum suscipit. Fusce leo risus, lobortis varius arcu tristique, ultrices tempus mi. Vestibulum semper augue sit amet luctus commodo. Vestibulum tristique iaculis diam eget malesuada. Aenean blandit accumsan vehicula.
        Maecenas dapibus nulla ut consequat dignissim. Nullam tempor eros turpis, in condimentum ligula laoreet id. Maecenas quis leo ac enim pretium varius eu ut enim. Donec ornare nec turpis in sollicitudin. Mauris eleifend ultricies libero at rhoncus. Quisque sit amet commodo nulla. Nullam vel massa massa. Morbi aliquet metus quis massa feugiat fermentum. Quisque ullamcorper eu ex eget elementum. Sed cursus volutpat risus a blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id rutrum mi. Donec maximus semper ligula id iaculis. Fusce mattis, nisl sed luctus condimentum, mi ex mollis tellus, quis molestie enim nisi vel justo. Aliquam dictum et mauris sed consectetur. In id mattis velit. Maecenas nec mi et justo ultricies venenatis. Nunc nec elit ut erat scelerisque semper. Pellentesque a justo nunc. Proin semper neque sit amet auctor pharetra. Sed nibh leo, consequat vitae vestibulum sit amet, blandit a nulla. Proin rutrum ullamcorper pharetra. Sed diam magna, ornare sit amet ultrices nec, volutpat quis metus. Duis tortor dui, mollis sit amet imperdiet a, rutrum ut urna. Phasellus feugiat et risus nec faucibus. Curabitur tempus purus metus, ac luctus ipsum dictum vitae. Nullam metus lectus, congue vel dignissim accumsan, gravida ut massa. Aliquam rhoncus, ex id luctus scelerisque, eros sem convallis libero, vel vulputate eros justo eget nisl. Donec lacus justo, pellentesque ac lectus rutrum, rutrum sagittis nisi. Phasellus vel diam eget arcu bibendum pulvinar euismod quis arcu. Nulla turpis neque, posuere vel bibendum et, pretium et nunc. Duis ac dolor malesuada, tristique ipsum quis, sollicitudin tellus. In faucibus mi sit amet tellus dapibus scelerisque. Praesent id sem mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam vel augue urna. Fusce ac justo sodales, ornare purus nec, vulputate turpis. Sed rhoncus, purus ut ultricies varius, magna magna convallis augue, id volutpat massa nibh ut purus. Integer facilisis elementum rhoncus. Praesent id libero in arcu accumsan tristique.`,
        supervisor: "6223e7f276b80392760dea94",
        degree: "Bc.",
        students: ["6222278da6d5a9361cbabf3a", "6223e7f276b80392760dea94"]
    })).toBe(false);

    // supervisor - have to be string
    expect(validateCreate({
        name: "Softwarový vývoj",
        description: "Popis studijního programu Softwarový vývoj.",
        supervisor: ["6223e7f276b80392760dea94"],
        degree: "Bc.",
        students: ["6222278da6d5a9361cbabf3a", "6223e7f276b80392760dea94"]
    })).toBe(false);

    // supervisor - missing key supervisor
    expect(validateCreate({
        name: "Softwarový vývoj",
        description: "Popis studijního programu Softwarový vývoj.",
        degree: "Bc.",
        students: ["6222278da6d5a9361cbabf3a", "6223e7f276b80392760dea94"]
    })).toBe(false);

    // students - have to be array
    expect(validateCreate({
        name: "Softwarový vývoj",
        description: "Popis studijního programu Softwarový vývoj.",
        supervisor: "6223e7f276b80392760dea94",
        degree: "Bc.",
        students: "6222278da6d5a9361cbabf3a"
    })).toBe(false);

    // students - array items have to be string
    expect(validateCreate({
        name: "Softwarový vývoj",
        description: "Popis studijního programu Softwarový vývoj.",
        supervisor: "6223e7f276b80392760dea94",
        degree: "Bc.",
        students: [777, "6223e7f276b80392760dea94"]
    })).toBe(false);

    // students - missing key students
    expect(validateCreate({
        name: "Softwarový vývoj",
        description: "Popis studijního programu Softwarový vývoj.",
        supervisor: "6223e7f276b80392760dea94",
        degree: "Bc.",
    })).toBe(false);

    // students - empty value
    expect(validateCreate({
        name: "Softwarový vývoj",
        description: "Popis studijního programu Softwarový vývoj.",
        supervisor: "6223e7f276b80392760dea94",
        degree: "Bc.",
        students: null
    })).toBe(false);

    // degree - have to be string
    expect(validateCreate({
        name: "Softwarový vývoj",
        description: "Popis studijního programu Softwarový vývoj.",
        supervisor: "6223e7f276b80392760dea94",
        degree: ["Ing."],
        students: ["6222278da6d5a9361cbabf3a", "6223e7f276b80392760dea94"]
    })).toBe(false);

    // degree - missing key degree
    expect(validateCreate({
        name: "Softwarový vývoj",
        description: "Popis studijního programu Softwarový vývoj.",
        supervisor: "6223e7f276b80392760dea94",
        students: ["6222278da6d5a9361cbabf3a", "6223e7f276b80392760dea94"]
    })).toBe(false);

});
