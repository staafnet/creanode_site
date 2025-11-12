<?php
function validate(array $data, array $rules): array
{
    $errors = [];

    foreach ($rules as $field => $fieldRules) {
        $value = trim($data[$field] ?? '');
        foreach ($fieldRules as $rule) {
            if ($rule === 'required' && $value === '') {
                $errors[$field][] = 'To pole jest wymagane.';
            }

            if ($rule === 'email' && $value !== '' && !filter_var($value, FILTER_VALIDATE_EMAIL)) {
                $errors[$field][] = 'Podaj poprawny adres e-mail.';
            }

            if (is_array($rule) && $rule[0] === 'min' && strlen($value) < (int) $rule[1]) {
                $errors[$field][] = 'Wpisz przynajmniej ' . (int) $rule[1] . ' znaków.';
            }
        }
    }

    return $errors;
}
